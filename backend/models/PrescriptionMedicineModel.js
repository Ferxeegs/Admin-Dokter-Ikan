import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Medicine from './MedicineModel.js'; // Import Medicine Model

const { DataTypes } = Sequelize;

const PrescriptionMedicine = db.define('prescriptions_medicine', {
  prescription_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'Prescriptions', // Referensi ke tabel Prescriptions, bukan model
      key: 'prescription_id'
    }
  },
  medicine_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Medicine,
      key: 'medicine_id'
    }
  }
}, {
    tableName: 'prescription_medicines',
    timestamps: false
});

export default PrescriptionMedicine;
