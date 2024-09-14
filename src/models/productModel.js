const pool = require('../config/db');

const createProductTable = `
  CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    produto VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(255),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

const init = async () => {
  await pool.query(createProductTable);
};

init();

const getAllProducts = async () => {
  const result = await pool.query('SELECT * FROM produtos');
  return result.rows;
};

const getProductById = async (id) => {
  const result = await pool.query('SELECT * FROM produtos WHERE id = $1', [id]);
  return result.rows[0];
};

const createProduct = async (product) => {
  const { produto, quantidade, preco, categoria } = product;
  const result = await pool.query(
    'INSERT INTO produtos (produto, quantidade, preco, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
    [produto, quantidade, preco, categoria]
  );
  return result.rows[0];
};

const updateProduct = async (id, product) => {
  const { quantidade, preco } = product;
  const result = await pool.query(
    'UPDATE produtos SET quantidade = $1, preco = $2 WHERE id = $3 RETURNING *',
    [quantidade, preco, id]
  );
  return result.rows[0];
};

const deleteProduct = async (id) => {
  const result = await pool.query('DELETE FROM produtos WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

const getProductsByCategory = async (categoria) => {
  if (!categoria) {
    throw new Error('Categoria não pode ser nula');
  }
  const result = await pool.query('SELECT * FROM produtos WHERE categoria = $1', [categoria]);
  return result.rows;
};


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
};
