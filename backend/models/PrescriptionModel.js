import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Consultation from './ConsultationModel.js';
import FishExperts from './FishExpertsModel.js';
import Medicine from './MedicineModel.js';
import PrescriptionMedicine from './PrescriptionMedicineModel.js';  // Import model PrescriptionMedicine

const { DataTypes } = Sequelize;

const Prescription = db.define('Prescription', {
  prescription_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  consultation_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Consultation,
      key: 'consultation_id'
    }
  },
  fishExperts_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FishExperts,
      key: 'fishExperts_id'
    }
  },
  medicine_fee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Default 0, akan dihitung otomatis
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'prescriptions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Relasi dengan Consultation
Prescription.belongsTo(Consultation, { foreignKey: 'consultation_id' });

// Relasi dengan FishExperts
Prescription.belongsTo(FishExperts, { foreignKey: 'fishExperts_id' });

// Relasi Many-to-Many dengan Medicine melalui tabel perantara PrescriptionMedicine
Prescription.belongsToMany(Medicine, { through: PrescriptionMedicine, foreignKey: 'prescription_id' });
Medicine.belongsToMany(Prescription, { through: PrescriptionMedicine, foreignKey: 'medicine_id' });

// Hook untuk menghitung medicine_fee otomatis sebelum save
Prescription.beforeSave(async (prescription) => {
  const medicines = await prescription.getMedicines();
  prescription.medicine_fee = medicines.reduce((total, medicine) => total + medicine.price, 0);
});

export default Prescription;
