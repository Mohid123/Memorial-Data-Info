import { User } from "src/@core/models/user.model";

export class RegisterModel extends User {
  setModel(_model: unknown) {
    const model = _model as RegisterModel;
    // this.email = model.email || '';
    // this.username = model.username || '';
    // this.password = model.password || '';
  }
}
