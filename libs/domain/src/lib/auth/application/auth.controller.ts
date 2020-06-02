import {
    Controller,
    Inject,
    HttpStatus,
    Body,
    Post,
    UseGuards,
    Response,
    UsePipes,
} from '@nestjs/common';
import { AccessRequest, SignUpRequest, AccessStatus } from '../entities/access.dto';
import { JwtAuthGuard } from '../infrastructure/jwt.guard';
import { AuthService } from '../infrastructure/auth.service';
import { ValidationPipe } from '@scl-co-eval/common';


@Controller('auth')
export class AuthController {
    constructor(
        @Inject(AuthService) private readonly _authService: AuthService
    ) {}

    @UsePipes(new ValidationPipe())
    @Post('signup')
    public async register(
        @Body() signUpRequest: SignUpRequest,
        @Response() response
    ) {

        const result = await this._authService.signUp(signUpRequest);

        if(!result || !result.status){
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        switch(result.status){
            case AccessStatus.Authenticated: {
                return response.status(HttpStatus.OK).json(result);
            }
            default:{
                return response.status(HttpStatus.BAD_REQUEST).json(result.status);
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('login')
    public async login(@Body() loginRequest: AccessRequest, @Response() response) {
        const result = await this._authService.login(loginRequest);

        if(!result || !result.status){
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        switch(result.status){
            case AccessStatus.Authenticated: {
                return response.status(HttpStatus.OK).json(result);
            }
            default:{
                return response.status(HttpStatus.BAD_REQUEST).json(result.status);
            }
        }
    }
}
