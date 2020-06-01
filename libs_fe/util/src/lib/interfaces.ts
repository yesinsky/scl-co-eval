export type LoginData = {
  email: string;
  password: string;
}

export type FormModel<T> = { [P in keyof T]: [T[P], any?] };
