import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable() 
export class AuthorizationGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        console.log('Inside the guard');
        const request = context.switchToHttp().getRequest();

        return true;
    }
}
