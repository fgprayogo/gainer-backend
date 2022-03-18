"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminManagementsController {
    async login({ auth, request, response }) {
        const { email, password } = request.body();
        try {
            const token = await auth.use('api').attempt(email, password);
            return token;
        }
        catch {
            return response.badRequest('Invalid credentials');
        }
    }
}
exports.default = AdminManagementsController;
//# sourceMappingURL=AdminManagementsController.js.map