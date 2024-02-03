import {
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';
import {
  IPortOneServiceCancel,
  IPortOneServiceCheckPaid,
} from './interfasces/portone-service.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PortOneService {
  constructor(private readonly configService: ConfigService) {}

  async getToken(): Promise<string> {
    // try {
    const result = await axios.post(`https://api.iamport.kr/users/getToken`, {
      imp_key: this.configService.get('IMPORT_REST_API_KEY'),
      imp_secret: this.configService.get('IMPORT_REST_API_SECRET_KEY'),
    });
    return result.data.response.access_token;
    // } catch (error) {
    //   throw new HttpException(
    //     error.response.data.message,
    //     error.response.status,
    //   );
    // }
  }

  async checkPaid({ impUid, amount }: IPortOneServiceCheckPaid): Promise<void> {
    // try {
    const accessToken = await this.getToken();
    const result = await axios.get(
      `https://api.iamport.kr/payments/${impUid}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (amount !== result.data.response.amount) {
      throw new UnprocessableEntityException('잘못된 결제 정보입니다.');
    }
    // } catch (error) {
    //   throw new HttpException(
    //     error.response.data?.message || error.response.message,
    //     error.response.status || error.response.statusCode,
    //   );
    // }
  }

  async cancel({ impUid }: IPortOneServiceCancel): Promise<number> {
    // try {
    const accessToken = await this.getToken();
    const result = await axios.post(
      `https://api.iamport.kr/payments/cancel`,
      {
        imp_uid: impUid,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return result.data.response.cancel_amount;
    // } catch (error) {
    //   throw new HttpException(
    //     error.response.data?.message || error.response.message,
    //     error.response.status || error.response.statusCode,
    //   );
    // }
  }
}
