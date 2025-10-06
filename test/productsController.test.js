const productsController = require('../controllers/productsController');
const Product = require('../models/ProductsModel');
jest.mock('../models/ProductsModel');

describe('Products Controller', () => {
  const mockReq = {
    method: 'GET',
    originalUrl: '/products',
    params: { id: '123' },
    body: {},
    user: { email: 'user@example.com' },
  };
  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllProducts returns products', async () => {
    Product.find.mockResolvedValue([{ name: 'Item A' }]);

    await productsController.getAllProducts(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      method: 'GET',
      path: '/products',
      message: 'Products retrieved successfully',
      data: [{ name: 'Item A' }],
    });
  });

  test('getProductById returns product', async () => {
    Product.findById.mockResolvedValue({ name: 'Item A' });

    await productsController.getProductById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      method: 'GET',
      path: '/products',
      param: '123',
      message: 'Product retrieved successfully',
      data: { name: 'Item A' },
    });
  });

  test('createNewProduct creates product', async () => {
    Product.findOne.mockResolvedValue(null);
    const mockSave = jest.fn().mockResolvedValue({ name: 'New Item' });
    Product.mockImplementation(() => ({ save: mockSave }));

    const req = {
      ...mockReq,
      method: 'POST',
      body: { name: 'New Item' },
    };

    await productsController.createNewProduct(req, mockRes);

    expect(mockSave).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      method: 'POST',
      path: '/products',
      body: { name: 'New Item' },
      message: 'Product created successfully',
      data: { name: 'New Item' },
    });
  });

  test('updateProductById updates product', async () => {
    Product.findById.mockResolvedValue({ createdBy: 'user@example.com' });
    Product.findOne.mockResolvedValue(null);
    Product.findByIdAndUpdate.mockResolvedValue({ name: 'Updated Item' });

    const req = {
      ...mockReq,
      method: 'PUT',
      body: { name: 'Updated Item' },
    };

    await productsController.updateProductById(req, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      method: 'PUT',
      path: '/products',
      param: '123',
      body: { name: 'Updated Item' },
      message: 'Product updated successfully',
      data: { name: 'Updated Item' },
    });
  });

  test('deleteProductById deletes product', async () => {
    Product.findById.mockResolvedValue({ createdBy: 'user@example.com' });
    Product.findByIdAndDelete.mockResolvedValue({});

    await productsController.deleteProductById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      method: 'GET',
      path: '/products',
      param: '123',
      message: 'Product deleted successfully',
    });
  });
});
