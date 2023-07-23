import { BaseService } from 'src/app/universal/base.service';
import { IResponse } from 'src/app/universal/shared.model';
import { IRole } from './role.model';

export class RoleService extends BaseService {
  /**
   *
   */
  constructor() {
    super();
  }

  addRole(role) {
    return this.postData<IResponse<any>>({
      url: `role/addRole`,
      body: {
        ...role,
      },
    });
  }

  getAll() {
    return this.getData<IResponse<IRole>>({
      url: `role/getAll`,
    });
  }
}
