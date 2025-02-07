export interface Medicine {
    medicine_id: number;
    vendor_id: number;
    medicine_name: string;
    contain: string;
    dosage: string;
    medicine_image?: string;
    price: number;
    stock: number;
  }