export interface CustomerFormDataI {
  fullname: string;
  email: string;
  phone_code: string;
  phone_number: string;
  age: number;
  address: string;
  know_from: string;
  checkout_type: string;
  notes?: string;
}

export interface CustomerI {
  fullname: string;
  email: string;
  phone_code: string;
  phone_number: string;
  age: number;
  address: string;
  know_from: string;
}