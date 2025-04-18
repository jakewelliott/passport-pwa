using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Diagnostics;
using DigitalPassportBackend.Errors;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;

const string corsPolicyName = "AllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
{
    builder.Configuration
        .AddIniFile(
            new PhysicalFileProvider(
                Path.Combine(Directory.GetCurrentDirectory(),
                    builder.Environment.IsDevelopment() ? "../../../" : ""),
                ExclusionFilters.None),
            ".env",
            false,
            true);

    // configure services (DI)
    builder.Services
        .AddGlobalErrorHandling()
        .AddServices()
        .AddPersistence(builder.Configuration, builder.Environment.IsDevelopment())
        .AddSecurity(builder.Configuration)
        .AddOrigins(builder.Configuration, corsPolicyName)
        .AddControllers();

    // Add Swagger to the container
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGenWithAuth();

    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        int port = builder.Environment.IsDevelopment() 
            ? int.Parse(builder.Configuration["API_DEV_PORT"]!) 
            : 5001; // this is hardcoded since we can't dynamically set port in nginx
        // that's technically a lie but i dont feel like using templates :)
        serverOptions.Listen(System.Net.IPAddress.Any, port);
    });
}
var app = builder.Build();
{
    app.MapControllers();
    app.UseExceptionHandler("/error");
    app.Map("/error", (HttpContext httpContext) =>
    {
        Exception? exception = httpContext.Features.Get<IExceptionHandlerFeature>()?.Error;

        if (exception is null)
        {
            // Handling this unexpected case
            return Results.Problem();
        }

        // Custom global error handling logic
        return exception switch
        {
            ServiceException serviceException => Results.Problem(
                statusCode: serviceException.StatusCode, 
                detail: serviceException.ErrorMessage),
            _ => Results.Problem()
        };
    });

    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<DigitalPassportDbContext>();
        await db.Database.MigrateAsync();
    }

    app.UseCors(corsPolicyName);
    app.UseRouting();
    app.UseAuthentication();
    app.UseAuthorization();

    app.UseSwagger();
    app.UseSwaggerUI();

}
app.Run();
