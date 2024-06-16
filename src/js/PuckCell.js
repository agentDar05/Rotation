class PuckCell {
    disabled = false;
    cssClass;
    title;
    additionalInfo;

    constructor(disabled, cssClass, title, additionalInfo){
        this.disabled = disabled;
        this.cssClass = cssClass;
        this.title = title;
        this.additionalInfo = additionalInfo;     
    }
    
}