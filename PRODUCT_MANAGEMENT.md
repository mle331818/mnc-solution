# Product Management Guide

## How to Add, Edit, or Remove Products

### 📁 **File Location**
All products are stored in: `src/data/products.json`

### ➕ **Adding a New Product**

1. **Open** `src/data/products.json`
2. **Find** the category you want to add to (e.g., `"cctv"`)
3. **Add** a new product object to the `products` array:

```json
{
  "id": "unique-product-id",
  "name": "Product Name",
  "price": 99.99,
  "salePrice": 89.99,
  "image": "/images/products/product-image.png",
  "description": "Product description here",
  "sku": "SKU-CODE",
  "barcode": "1234567890123",
  "stock": 10,
  "category": "cctv",
  "brand": "Brand Name"
}
```

### ✏️ **Editing a Product**

1. **Open** `src/data/products.json`
2. **Find** the product by its `id`
3. **Update** any field you want to change
4. **Save** the file

### ❌ **Removing a Product**

1. **Open** `src/data/products.json`
2. **Find** the product by its `id`
3. **Delete** the entire product object
4. **Save** the file

### 📸 **Adding Product Images**

1. **Place** your image in `/public/images/products/`
2. **Update** the `image` field in the JSON to point to your image:
   ```json
   "image": "/images/products/your-image.png"
   ```

### 🚀 **Deploying Changes**

1. **Save** the `products.json` file
2. **Commit** to Git:
   ```bash
   git add src/data/products.json
   git commit -m "Added new product"
   git push
   ```
3. **Wait** 1-2 minutes for automatic deployment

### 📋 **Product Fields**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | ✅ | Unique product identifier |
| `name` | string | ✅ | Product name |
| `price` | number/string | ✅ | Original price |
| `salePrice` | number/string | ❌ | Sale price (optional) |
| `image` | string | ✅ | Image path |
| `description` | string | ✅ | Product description |
| `sku` | string | ❌ | Stock keeping unit |
| `barcode` | string | ❌ | Product barcode |
| `stock` | number | ❌ | Available stock |
| `category` | string | ✅ | Product category |
| `brand` | string | ❌ | Brand name |
| `features` | array | ❌ | Product features list |

### 🏷️ **Available Categories**

- `cctv` - CCTV Systems
- `network-solution` - Network Solutions
- `softwares` - Software Solutions
- `computer-laptops` - Computers & Laptops
- `satellite` - Satellite Solutions
- `fiber-solution` - Fiber Solutions
- `interphone-solution` - Interphone Solutions
- `3d-printers-cnc` - 3D Printers & CNC
- `automation-system` - Automation System

### 💡 **Tips**

- **Use unique IDs** for each product
- **Keep image names** simple and descriptive
- **Test locally** before pushing to Git
- **Backup** your JSON file before making changes
- **Use consistent formatting** for prices (numbers or strings with $)

### 🔍 **Example Product**

```json
{
  "id": "dahua-camera-4k",
  "name": "Dahua 4K Security Camera",
  "price": 299.99,
  "salePrice": 249.99,
  "image": "/images/products/dahua-4k-camera.png",
  "description": "4K Ultra HD security camera with night vision",
  "sku": "DH-4K-CAM",
  "barcode": "1234567890123",
  "stock": 5,
  "category": "cctv",
  "brand": "Dahua",
  "features": [
    "4K Ultra HD",
    "Night Vision",
    "Weatherproof",
    "Motion Detection"
  ]
}
``` 