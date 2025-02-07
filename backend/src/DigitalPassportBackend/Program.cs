using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using DigitalPassportBackend;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);
{
    var root = Directory.GetCurrentDirectory();
    var dotenv = Path.Combine(root, builder.Environment.IsDevelopment() ? "../../../.env" : ".env");
    DotEnv.Load(dotenv);

    builder.Configuration.AddEnvironmentVariables();

    // configure services (DI)
    builder.Services
        .AddGlobalErrorHandling()
        .AddServices()
        .AddPersistence(builder.Configuration, builder.Environment.IsDevelopment())
        .AddControllers();

    // Add Swagger to the container
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.WebHost.ConfigureKestrel(serverOptions =>
    {
        serverOptions.Listen(System.Net.IPAddress.Any, int.Parse(builder.Configuration[$"API_{(builder.Environment.IsDevelopment() ? "DEV_" : "")}PORT"]!)); // Listen on all network interfaces on port 5000
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
        return Results.Problem();
    });

    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<DigitalPassportDbContext>();
        await db.Database.MigrateAsync();
    }

    app.UseSwagger();
    app.UseSwaggerUI();

}
app.Run();
