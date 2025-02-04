using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Persistence.Repository;

namespace DigitalPassportBackend.Services;
public class ProductService(ProductsRepository productsRepository)
{

    private readonly ProductsRepository _productsRepository = productsRepository;
    public Product Create(Product product)
    {
        return _productsRepository.Create(product);
    }

    public Product? GetById(Guid productId)
    {
        return _productsRepository.GetById(productId);
    }
}