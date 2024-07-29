type ActionState =
  | {
      code: "SUCCESS"; // 성공
      message: string;
    }
  | {
      code: "VALIDATION_ERROR"; // Zod 유효성 검사 에러
      fieldErrors: {
        [field: string]: string[];
      };
    }
  | {
      code: "AUTH_ERROR"; // 인증 에러
      message: string;
    }
  | {
      code: "EXISTS_ERROR"; // 커스텀 에러
      key: string;
      message: string;
    }
  | {
      code: "INTERNAL_ERROR"; // 알 수 없는 오류
      err: any;
    };
