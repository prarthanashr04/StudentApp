export interface StudentDataType {
  name: string;
  id: number;
  additional_subject: string;
  branch: string;
  email_id: string;
  phone_no: string;
  average_percentage: string;
  password: string;
}
export interface StudentDataTypeNoID {
  name: string;
  additional_subject: string;
  branch: string;
  email_id: string;
  phone_no: string;
  average_percentage: string;
  password: string;
}

export interface LoginDataType {
  email_id: string;
  password: string;
}