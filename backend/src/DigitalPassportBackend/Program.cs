using DigitalPassportBackend.Persistence.Database;
using DigitalPassportBackend.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using DigitalPassportBackend;

var builder = WebApplication.CreateBuilder(args);
{
    var root = Directory.GetCurrentDirectory();
    var dotenv = Path.Combine(root, ".env");
    DotEnv.Load(dotenv);

    builder.Configuration.AddEnvironmentVariables();

    // configure services (DI)
    builder.Services
        .AddServices()
        .AddPersistence(builder.Configuration)
        .AddControllers();

    // Add Swagger to the container
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}
var app = builder.Build();
{
    app.MapControllers();

    using (var scope = app.Services.CreateScope())
    {
        var db = scope.ServiceProvider.GetRequiredService<DigitalPassportDbContext>();
        await db.Database.MigrateAsync();
    }

    app.UseSwagger();
    app.UseSwaggerUI();

}
app.Run();
