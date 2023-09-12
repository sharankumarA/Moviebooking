import jwt_decode from 'jwt-decode';

export const getUserRolesFromToken = (token) => {
    try {
        //const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkFyYXZpbmQiLCJQYXNzd29yZCI6Iml0YWNoaSIsIlJvbGUiOiJ1c2VycyIsImV4cCI6MTY5MDk2Mzc5MX0.OzRC9IAe0Zm1eRthK1uMHoTvmBdNAGTNOXZyYSj-e7CncWRTLCWx2VmQLaC6IiDcROroDFmQJB4eItD_YARYqA';
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedToken = JSON.parse(atob(base64));
        //console.log("decoded " + decodedToken);
        return decodedToken.Role;
    } catch (error) {
        return [];
    }
};