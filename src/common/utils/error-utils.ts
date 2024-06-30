import { ElMessage } from "element-plus";

export namespace ErrorUtils {
  export function generateErrorFromAuthErrorCode(errorCode: string): void {
    let errorMsg = `${errorCode}`;
    if (errorCode === "auth/invalid-credential")
      errorMsg = `Mot de passe incorrect`;
    else if (errorCode === "auth/invalid-email")
      errorMsg = `Adresse mail inconnue`;
    ElMessage({
      type: "error",
      message: `Erreur lors de votre authentification: ${errorMsg}`,
    });
  }
}
