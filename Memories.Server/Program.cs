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
using Memories.Server.Filters; // �������� using ��� ������ ������������ ���� ��������
using Microsoft.AspNetCore.Diagnostics; // �����������, ���� �� �������� ������������ UseExceptionHandler ������ � ��������

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// ��������� ��� ���������������� ������ ���������� ��� ������
builder.Services.AddScoped<GlobalExceptionFilter>(); // ����������� ��� ������ ������ �������

// ������� ��������� JsonSerializerOptions
JsonSerializerOptions options = new()
{
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    WriteIndented = true
};

// ����������� ����������� � �������������� ��������� ����������
builder.Services.AddControllers(options =>
{
    // ��������� ��� ���������� ������ ���������� �� ���� ������������
    options.Filters.Add(typeof(GlobalExceptionFilter));
}).AddJsonOptions(opts =>
{
    opts.JsonSerializerOptions.ReferenceHandler = options.ReferenceHandler;
    opts.JsonSerializerOptions.WriteIndented = options.WriteIndented;
});


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

// �������� ������ ����������� �� ����� ������������
string connection = builder.Configuration.GetConnectionString("DefaultConnection");

Option.RegistrationRepository(builder.Services);
// AddDI(services);

// ��������� �������� ApplicationContext � �������� ������� � ����������
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
    // � ������ ���������� ����� ������������ DeveloperExceptionPage ��� ����� ��������� ���������� �� �������
    app.UseDeveloperExceptionPage();
}
else
{
    // � ���������� ����� ������������ UseExceptionHandler ��� ��������� ������� ��� ���������� ��� ������������
    // ���� ���������� ��������� � �����������, ��� ������� ���������� GlobalExceptionFilter
    // ���� �� ������, ����� UseExceptionHandler ����� ����������� ����������,
    // ������� �� ���� ���������� �������� (��������, ���� �� �� ���������� ExceptionHandled = true),
    // �������� ��� �����.
    // ���� �� ��������� ����������� �� ������ ��� ������������, � ��� �� ����� ���������
    // ���������� ��� ������������, �� ������ ������ UseExceptionHandler.
    app.UseExceptionHandler("/Error"); // ��� ����������� ������� appBuilder.Run(...)
}

app.UseHttpsRedirection();

app.UseCors("AllowOrigin");

app.UseAuthorization();

app.MapControllers(); // ���������, ��� MapControllers ��������� ����� middleware ��������� ����������

app.MapFallbackToFile("/index.html");

app.Run();