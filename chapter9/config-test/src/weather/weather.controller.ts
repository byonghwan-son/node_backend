import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  constructor(private configService: ConfigService) { }

  @Get()
  public getWeather() {
    // 환경 변수값 가져오기
    const apiUrl = this.configService.get<string>('WEATHER_API_URL');
    const apiKey = this.configService.get<string>('WEATHER_API_KEY');
    
    return this.callWeatherApi(apiUrl, apiKey)
  }

  private callWeatherApi(apiUrl: string, apiKey: string) : string {
    console.log(apiUrl);
    console.log(apiKey);
    console.log("날씨 정보 가져오는 중...");
    return "내일은 맑음";
  }
}
