export class User {
  id?: string;
  firstName!: string;
  middleName!: string;
  lastName!: string;
  designation!: string;
  bio!: string;
  profilePic!: {
    captureFileURL: string,
    blurHash: string
  }
}
