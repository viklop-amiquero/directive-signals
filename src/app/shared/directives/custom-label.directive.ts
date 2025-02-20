import { Directive, ElementRef, Input, OnInit } from '@angular/core'
import { ValidationErrors } from '@angular/forms'

@Directive({
    selector: '[customLabel]',
    standalone: false,
})
export class CustomLabelDirective implements OnInit {
    private _htmlElement?: ElementRef<HTMLElement>
    private _color = 'red'
    private _errors?: ValidationErrors | null

    @Input()
    set color(color: string) {
        this._color = color
        this.setStyle()
    }

    @Input()
    set errors(value: ValidationErrors | null | undefined) {
        this._errors = value
        this.setErrorMessage()
    }

    constructor(private _el: ElementRef<HTMLElement>) {
        this._htmlElement = _el
    }

    ngOnInit(): void {
        this.setStyle()
    }

    setStyle(): void {
        if (!this._htmlElement) return

        this._htmlElement!.nativeElement.style.color = this._color
    }

    setErrorMessage(): void {
        if (!this._htmlElement) return
        if (!this._errors) {
            this._htmlElement.nativeElement.innerText = 'No hay errores'
            return
        }

        const errors = Object.keys(this._errors)
        console.log(errors)
        if (errors.includes('required')) {
            this._htmlElement.nativeElement.innerText =
                'Este campo este requerido.'
            return
        }
        if (errors.includes('minlength')) {
            const min = this._errors['minlength']['requiredLength']
            const current = this._errors['minlength']['actualLength']
            this._htmlElement.nativeElement.innerText = `Mínimo ${current}/${min} caracteres`
            return
        }
        if (errors.includes('email')) {
            this._htmlElement.nativeElement.innerText =
                'Este campo debe ser de tipo email.'
            return
        }
    }
}
