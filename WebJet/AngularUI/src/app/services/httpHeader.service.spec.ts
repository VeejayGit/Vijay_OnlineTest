
import { HttpHeaders } from '@angular/common/http';
import { HttpHeaderService } from './httpHeader.service';

describe('httpHeaderService', () => {
    let service: HttpHeaderService;
    beforeEach(() => { service = new HttpHeaderService(); });

    it('#createHeaders should create correct headers', () => {
        const createHeadersCall = service.createHeaders('xyz');
        expect(createHeadersCall.has('Authorization')).toBeTruthy();
        expect(createHeadersCall.get('Authorization')).toBe('bearer xyz');
    });

    it('#createTokenHeaders should create correct headers', () => {
        const createHeadersCall = service.createTokenHeaders();
        expect(createHeadersCall.has('grant_type')).toBeTruthy();
        expect(createHeadersCall.get('grant_type')).toBe('password');
    });
  });
