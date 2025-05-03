using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace Memories.Server.Filters // Убедитесь, что пространство имен соответствует вашему проекту
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<GlobalExceptionFilter> _logger;
        private readonly IHostEnvironment _env; // Добавляем для проверки окружения

        public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger, IHostEnvironment env)
        {
            _logger = logger;
            _env = env;
        }

        public void OnException(ExceptionContext context)
        {
            // Логируем исключение
            _logger.LogError(context.Exception, "An unhandled exception occurred in a controller action.");

            // Устанавливаем код состояния HTTP
            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.HttpContext.Response.ContentType = "application/json";

            // Формируем ответ
            object responseBody;

            if (_env.IsDevelopment())
            {
                // В режиме разработки включаем подробности исключения
                responseBody = new
                {
                    error = "An unexpected error occurred.",
                    details = context.Exception.Message,
                    stackTrace = context.Exception.StackTrace
                };
            }
            else
            {
                // В продакшене предоставляем общее сообщение об ошибке
                responseBody = new
                {
                    error = "An unexpected error occurred."
                };
            }

            // Устанавливаем результат действия
            context.Result = new ObjectResult(responseBody)
            {
                StatusCode = context.HttpContext.Response.StatusCode
            };

            // Указываем, что исключение обработано
            context.ExceptionHandled = true;
        }
    }
}