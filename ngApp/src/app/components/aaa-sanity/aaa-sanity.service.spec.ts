import {async, fakeAsync, tick, TestBed, getTestBed} from '@angular/core/testing';
import {AAAService, User} from "./shared/mockhttp.service";
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { AuthHttp } from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";

export interface User {
  login: string;
  _id: string;
}

describe('Mock AAAService', () => {
  let injector: TestBed;
  let service: AAAService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AAAService]
    });
    injector = getTestBed();
    service = TestBed.get(AAAService);
    httpMock = TestBed.get(HttpTestingController);
  })
  afterEach(() => {
  });
  // tests here
  describe('#getUsers<User>', () => {
    xit('should return method of GET', fakeAsync(() => {
      let dummyUsers: User[];
      // let users: User[];
      dummyUsers =[
        {login: 'John', _id: '1'},
        {login: 'Doe', _id: '2'}
      ];
      service.getUsers();

      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      console.log("URL", req.request.url);
      expect(req.request.method).toEqual("GET");

      req.flush(dummyUsers);
      tick();
      expect(service.getUsers.length).toBe(1);
      httpMock.verify();

    }));

    it('should return an Observable User Array of length 2 ', () => {
      let dummyUsers: User[] = [
        { login: 'John', _id: '1' },
        { login: 'Doe', _id: '2' }
      ];
      service.getUsers().subscribe((data)=> {
        // see comment below
        // this.users = users;
      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      expect(data.length).toBe(1);
      req.flush(dummyUsers);
    });
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

  it('should return an Observable User of Luke', () => {

    service.getSingleUser(1).subscribe(users => {
      expect(users.login).toBe("Luke");

    const url = ('http://localhost:3000/api/mocks')
    const req = httpMock.expectOne(url);
    console.log('REQ URL', req.request.url);
    expect(req.request.method).toBe('GET');
    req.flush({login: "Luke"});
    httpMock.verify();
  });
  });
});

  describe('#postUser<User>', () => {
    it('should return method of Post', () => {
      const dummyUser =
      {login: 'John Doe', _id: '1'};
      service.addUser(dummyUser).subscribe(users => {
      });
      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);

      expect(req.request.method).toBe("POST");
      req.flush(dummyUser);
      httpMock.verify();
    });

    it('should return an Observable User Id to equal 1', () => {
      const dummyUsers =
      {login: 'John Doe', _id: '1'};
      service.addUser(dummyUsers).subscribe(users => {
        // Note for next uncommented line.
        // A function expression using the function keyword introduces a new dynamically bound
        // this, whereas an arrow function expression preserves the this of its enclosing context.
        //   Arrow function expressions are particularly useful for writing callbacks,
        //   which otherwise often have an undefined or unexpected this. In the example
        // the use of an arrow function expression causes the callback to have the same
        // this as the surrounding 'start' method. Writing the callback as a standard function expression
        // it becomes necessary to manually arrange access to the surrounding this,
        // for example by copying it into a local variable:
        // https://aigeec.com/angularjs-2-do-something-when-my-observable-is-complete/
        // this.users = users;

      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe("POST");
      req.flush(dummyUsers);
        httpMock.verify();
    });
    });

    it('should return an Observable User John Doe', () => {
      const dummyUsers =
      {login: 'John Doe', _id: '1'};
      service.addUser(dummyUsers).subscribe(users => {
        expect(users).toEqual(dummyUsers);
      });
      const url = 'http://localhost:3000/api/mocks'
      const req = httpMock.expectOne(url);
      req.flush(dummyUsers);
      httpMock.verify();
    });
  });
  describe('#putUser<User>', () => {
    it('should return method of Put', () => {
      const dummyUser =
      {login: 'John Doe', _id: '1'};
      service.updateUser(dummyUser).subscribe(users => {
      });
      const url = 'http://localhost:3000/api/mocks/1';
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe("PUT");
      req.flush(dummyUser);
      httpMock.verify();
    });

    it('should return an Observable User Object', () => {
      let updateUser: User;
      updateUser = {login: 'Jimmy Doe', _id: '1'};
      service.updateUser(updateUser).subscribe(users => {
        this.users = users;
        expect(this.users.login).toEqual('Jimmy Doe1');
        console.log("LOGIN TEST JIMMY DOE", this.users);
      const url = 'http://localhost:3000/api/mocks/1'
      const req = httpMock.expectOne(url);
      req.flush(updateUser);
        httpMock.verify();
    });
    });

    it('should return an Observable User John Doe', () => {
      const dummyUser = {login: 'John Doe', _id: '1'};
      service.updateUser(dummyUser).subscribe(users => {
        expect(users).toEqual(dummyUser);
      });
      const url = 'http://localhost:3000/api/mocks/1'
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe("PUT");
      req.flush(dummyUser);
      httpMock.verify();
    });
  });
  describe('#deleteUser<User>', () => {
    it('should return method of Delete', () => {
      const url = 'http://localhost:3000/api/mocks/1';
      const dummyUser = {login: 'John Doe', _id: '1'};
      service.deleteUser(dummyUser).subscribe(users => {
      });
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe("DELETE");
      req.flush(dummyUser);
      httpMock.verify();
    });

    it('should return an Observable User Array of length 1 ', () => {
      const dummyUser = {login: 'Jimmy Doe11', _id: '2'};
      service.deleteUser(dummyUser).subscribe(data => {
        this.data = data;
        expect(this.data.login).toEqual('Jimmy Doe');

      const url = 'http://localhost:3000/api/mocks/1'
      const req = httpMock.expectOne(url);
      req.flush(dummyUser);
      httpMock.verify();
    });
    });

    it('should return an Observable User John Doe ', () => {
      const dummyUsers = {login: 'John Doe', _id: '2'};
      service.deleteUser(dummyUsers).subscribe(users => {
        expect(users).toEqual(dummyUsers);
      });
      const url = 'http://localhost:3000/api/mocks/1'
      const req = httpMock.expectOne(url);
      req.flush(dummyUsers);
      httpMock.verify();
    });
  });
});
