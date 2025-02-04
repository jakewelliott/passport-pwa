namespace DigitalPassportBackend.Domain;

public class Product
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string Name { get; set; }
    public required string Category { get; set; }
    public required string Subcategory { get; set; }
}