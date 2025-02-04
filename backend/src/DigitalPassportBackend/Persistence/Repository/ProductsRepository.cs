using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Database;

namespace DigitalPassportBackend.Persistence.Repository;
public class ProductsRepository(DigitalPassportDbContext digitalPassportDbContext)
{
    private readonly DigitalPassportDbContext _digitalPassportDbContext = digitalPassportDbContext;
    public Product Create(Product product)
    {
        _digitalPassportDbContext.Products.Add(product);
        _digitalPassportDbContext.SaveChanges();
        return product;
    }

    public Product? GetById(Guid productId)
    {
        return _digitalPassportDbContext.Products.Find(productId);
    }
}