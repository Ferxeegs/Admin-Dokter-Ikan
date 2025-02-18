import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

// Mendefinisikan model Article
const Article = db.define('Article', {
  article_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Uncategorized'
  },  
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  urltoimage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  contents: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'article',  // Nama tabel sesuai dengan database
  timestamps: true  // Jika tidak menggunakan kolom createdAt dan updatedAt
});

export default Article;
