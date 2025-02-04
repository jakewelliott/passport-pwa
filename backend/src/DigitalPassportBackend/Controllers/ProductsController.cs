using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DigitalPassportBackend.Domain;
using DigitalPassportBackend.Services;

namespace DigitalPassportBackend.Controllers;

[ApiController]
[Route("/api/products")]
public class ProductsController(ProductService productService) : ControllerBase
{

    private readonly ProductService _productService = productService;

    [HttpPost]
    public IActionResult Create(CreateProductRequest request)
    {
        // mapping to internal representation
        var product = request.ToDomain();

        // invoking the use case
        _productService.Create(product);

        // mapping to external representation
        // return 201 created response
        return CreatedAtAction(
            nameof(Get),
            new { productId = product.Id },
            value: ProductResponse.FromDomain(product)
        );
    }

    [HttpGet("{productId:guid}")]
    public IActionResult Get(Guid productId)
    {
        // invoking the use case
        var product = _productService.GetById(productId);

        // return 200 ok
        return product is null 
        ? Problem( statusCode:StatusCodes.Status404NotFound, detail: $"Product not found (p)" )
        : Ok(ProductResponse.FromDomain(product));
    }

    public record CreateProductRequest(string Name, string Category, string Subcategory)
    {
        public Product ToDomain()
        {
            return new Product
            {
                Name = Name,
                Category = Category,
                Subcategory = Subcategory,
            };
        }
    }
    public record ProductResponse(Guid Id, string Name, string Category, string Subcategory)
    {
        public static ProductResponse FromDomain(Product product)
        {
            return new ProductResponse(
                product.Id,
                product.Name,
                product.Category,
                product.Subcategory
            );
        }

    };
}