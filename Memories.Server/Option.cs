using Memories.Server.Interface;
using Memories.Server.Services;
using Microsoft.AspNetCore.Authorization;

namespace Memories.Server
{
    public static class Option
    {
        public static void RegistrationRepository(IServiceCollection services) {
            services.AddScoped<IAuthenticateR, AuthenticateR>();
            services.AddScoped<IUserR, UserR>();
            services.AddScoped<IAreaR, AreaR>();
            services.AddScoped<ICardR, CardR>();
            services.AddScoped<ILessonR, LessonR>();
        }
    }
}
