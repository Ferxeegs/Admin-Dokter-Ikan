import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Prescription from './PrescriptionModel.js'; // Asosiasi ke resep medis
import User from './UserModel.js'; // Asosiasi ke pengguna

const { DataTypes } = Sequelize;

const Payment = db.define('Payment', {
  payment_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    prescription_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Prescription,
      key: 'prescription_id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  medicine_fee: {
    type: DataTypes.INTEGER, // Menggunakan INTEGER
    allowNull: false
  },
  consultation_fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10000 // Nilai tetap 10000
  },
  total_fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Default 0, akan dihitung sebelum disimpan
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending"
  }
}, {
  tableName: 'payment',
  timestamps: false
});

// Relasi dengan MedicalPrescription dan User
Payment.belongsTo(Prescription, { foreignKey: 'medical_prescription_id' });
Payment.belongsTo(User, { foreignKey: 'user_id' });

// Hook untuk menghitung total_fee sebelum menyimpan data
Payment.beforeCreate((payment) => {
  payment.total_fee = payment.medicine_fee + payment.consultation_fee;
});

Payment.beforeUpdate((payment) => {
  payment.total_fee = payment.medicine_fee + payment.consultation_fee;
});

export default Payment;
