using Memories.Server.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Threading.Tasks;
using Memories.Server;
using Microsoft.Extensions.Configuration;
using Npgsql;
using Memories.Server.Filters; // Добавьте using для вашего пространства имен фильтров
using Microsoft.AspNetCore.Diagnostics; // Понадобится, если вы захотите использовать UseExceptionHandler вместе с фильтром

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Добавляем ваш пользовательский фильтр исключений как сервис
builder.Services.AddScoped<GlobalExceptionFilter>(); // Используйте имя вашего класса фильтра

// Создаем экземпляр JsonSerializerOptions
JsonSerializerOptions options = new()
{
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    WriteIndented = true
};

// Настраиваем контроллеры с использованием созданных параметров
builder.Services.AddControllers(options =>
{
    // Добавляем ваш глобальный фильтр исключений ко всем контроллерам
    options.Filters.Add(typeof(GlobalExceptionFilter));
}).AddJsonOptions(opts =>
{
    opts.JsonSerializerOptions.ReferenceHandler = options.ReferenceHandler;
    opts.JsonSerializerOptions.WriteIndented = options.WriteIndented;
});


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

// получаем строку подключения из файла конфигурации
string connection = builder.Configuration.GetConnectionString("DefaultConnection");

Option.RegistrationRepository(builder.Services);
// AddDI(services);

// добавляем контекст ApplicationContext в качестве сервиса в приложение
builder.Services.AddDbContext<conMemories>(options => options.UseNpgsql(connection));
builder.Services.AddScoped<NpgsqlConnection>(provider => new NpgsqlConnection(connection));

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "AllowOrigin",
        builder => {
            builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
        });
});

builder.Services.AddAuthorization();


var secret = builder.Configuration["Jwt:Secret"];
var key = Encoding.ASCII.GetBytes(secret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})

// Adding Jwt Bearer
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ClockSkew = TimeSpan.Zero,

        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
    // В режиме разработки можно использовать DeveloperExceptionPage для более детальной информации об ошибках
    app.UseDeveloperExceptionPage();
}
else
{
    // В продакшене можно использовать UseExceptionHandler как резервный вариант для исключений вне контроллеров
    // Если исключение произошло в контроллере, его сначала перехватит GlobalExceptionFilter
    // Если вы хотите, чтобы UseExceptionHandler также обрабатывал исключения,
    // которые не были обработаны фильтром (например, если вы не установили ExceptionHandled = true),
    // оставьте его здесь.
    // Если вы полностью полагаетесь на фильтр для контроллеров, и вам не нужна обработка
    // исключений вне контроллеров, вы можете убрать UseExceptionHandler.
    app.UseExceptionHandler("/Error"); // Или используйте делегат appBuilder.Run(...)
}

app.UseHttpsRedirection();

app.UseCors("AllowOrigin");

app.UseAuthorization();

app.MapControllers(); // Убедитесь, что MapControllers находится после middleware обработки исключений

app.MapFallbackToFile("/index.html");

app.Run();