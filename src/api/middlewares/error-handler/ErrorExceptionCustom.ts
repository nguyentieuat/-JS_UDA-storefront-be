export class ErrorExceptionCustom extends Error {
  public static readonly Unauthenticated = "Unauthenticated";
  public static readonly NotFound = "NotFound";
  public static readonly MaximumAllowedGrade = "MaximumAllowedGrade";
  public static readonly AsyncError = "AsyncError";
  public static readonly UnknownError = "UnknownError";
  public code = 500;
  public metaData: any = null;
  constructor(
    name: string = ErrorExceptionCustom.UnknownError,
    metaData: any = null
  ) {
    super(name);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.code = 500;
    this.metaData = metaData;
    switch (name) {
      case ErrorExceptionCustom.Unauthenticated:
        this.code = 401;
        break;
      case ErrorExceptionCustom.MaximumAllowedGrade:
        this.code = 402;
        break;
      case ErrorExceptionCustom.AsyncError:
        this.code = 400;
        break;
      case ErrorExceptionCustom.NotFound:
        this.code = 404;
        break;
      default:
        this.code = 500;
        break;
    }
  }
}
