export interface PostFormViewModel {
  canSubmit: boolean;
  resetForm: () => string;
}

export class PostFormPresenter {
  toViewModel(content: string): PostFormViewModel {
    return {
      canSubmit: content.trim().length > 0,
      resetForm: () => '',
    };
  }
}