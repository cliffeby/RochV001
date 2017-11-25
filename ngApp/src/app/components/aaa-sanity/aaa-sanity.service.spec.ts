import {async, fakeAsync, tick, TestBed, getTestBed} from '@angular/core/testing';
import {AAAService, User} from "./shared/mockhttp.service";
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";

interface User {
  login: string;
  _id: string;
}

describe('Mock Service', () => {
  let injector: TestBed;
  let service: AAAService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AAAService, AuthService, AuthHttp]
        });
      injector = getTestBed();
      service = injector.get(AAAService);
      httpMock = injector.get(HttpTestingController);
  })
  afterEach(() => {
    httpMock.verify();
});
  // tests here
  describe('#getUsers<User>', () => {
    it('should return method of GET', () => {
      const dummyUsers = [
        { login: 'John' },
        { login: 'Doe' }
      ];
      service.getUsers().subscribe(users => {
      });
      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe("GET");
      req.flush(dummyUsers);
    });

    it('should return an Observable User Array of length 2 ', () => {
      const dummyUsers = [
        { login: 'John' },
        { login: 'Doe' }
      ];
      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
      });
      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      req.flush(dummyUsers);
    });

    it('should return an Observable Users of John and Doe', () => {
      const dummyUsers = [
        { login: 'John' },
        { login: 'Doe' }
      ];
      service.getUsers().subscribe(users => {
        expect(users).toEqual(dummyUsers);
      });
      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      req.flush(dummyUsers);
    });
  });
  describe('#postUser<User>', () => {
    it('should return method of Post', () => {
      const dummyUser =
      { login: 'John Doe', _id: '1' };
      service.addUser(dummyUser).subscribe(users => {
      });
      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe("POST");
      req.flush(dummyUser);
    });

    it('should return an Observable User Id to equal 1', () => {
      const dummyUsers =
        { login: 'John Doe', _id: '1' };
      service.addUser().subscribe(users => {
        console.log('USERS in POST', users);
        expect(users._id).toEqual('1');
      });
      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      req.flush(dummyUsers);
    });

    it('should return an Observable User John Doe', () => {
      const dummyUsers =
      { login: 'John Doe', _id: '1' };
      service.addUser().subscribe(users => {
        expect(users).toEqual(dummyUsers);
      });
      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      req.flush(dummyUsers);
    });
  });
  describe('#putUser<User>', () => {
    it('should return method of Put', () => {
      const dummyUser =
        { login: 'John Doe', _id:'1'}
        ;
      service.updateUser(dummyUser).subscribe(users => {
      });
      const url = 'http://localhost:3000/api/mocks/1';
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe("PUT");
      req.flush(dummyUser);
    });

    it('should return an Observable User Object', () => {
      let updateUser: User;
        updateUser = {login: 'Jimmy Doe', _id: '1'};
      service.updateUser(updateUser).subscribe(users => {
      expect(users.login).toEqual('Jimmy Doe');
    });
    const url = 'http://localhost:3000/api/mocks/1'
    const req = httpMock.expectOne(url);
    req.flush(updateUser);
  });

  it('should return an Observable User John Doe', () => {
    const dummyUser = { login: 'John Doe', _id: '1' };
    service.updateUser(dummyUser).subscribe(users => {
      expect(users).toEqual(dummyUser);
    });
    const url = 'http://localhost:3000/api/mocks/1'
    const req = httpMock.expectOne(url);
    req.flush(dummyUser);
  });
});
describe('#deleteUser<User>', () => {
  it('should return method of Delete', () => {
    const url = 'http://localhost:3000/api/mocks/1';
    const dummyUser = { login: 'John Doe', _id: '1'};
    service.deleteUser(dummyUser).subscribe(users =>{});

    const req = httpMock.expectOne(url);
    expect(req.request.method).toBe("DELETE");
    req.flush(dummyUser);
  });

  it('should return an Observable User Array of length 1 ', () => {
    const dummyUser = {login: 'Jimmy Doe', _id: '2'};
    service.deleteUser().subscribe(users => {
    expect(users.login).toEqual('Jimmy Doe');
    });
  const url = 'http://localhost:3000/api/mocks/1'
  const req = httpMock.expectOne(url);
  req.flush(dummyUser);
});

it('should return an Observable User John Doe', () => {
  const dummyUsers = { login: 'John Doe', _id: '2' };
  service.deleteUser().subscribe(users => {
    expect(users).toEqual(dummyUsers);
  });
  const url = 'http://localhost:3000/api/mocks/1'
  const req = httpMock.expectOne(url);
  req.flush(dummyUsers);
});
});
