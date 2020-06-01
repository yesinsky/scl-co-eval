import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFacade } from './login.facade';
import { LoginData, FormModel} from '@scl-co-eval/util';

@Component({
    selector: 'scl-co-eval-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;

    constructor(private readonly _formBuilder: FormBuilder, private readonly _loginFacade: LoginFacade) {}

    ngOnInit(): void {

        const model: FormModel<LoginData> = {
          email: [null, [Validators.required, Validators.email]],
          password: [null, [Validators.required, Validators.minLength(6)]],
        }

        this.loginForm = this._formBuilder.group(model);
    }

    onSignUp() {
        //TODO
        const data: LoginData = this.loginForm.value;
        this._loginFacade.handleSignUp(data.email,data.password);
    }

    onLogin() {
        //TODO
        const data: LoginData = this.loginForm.value;
        this._loginFacade.handleLogin(data.email, data.password);
    }

}
