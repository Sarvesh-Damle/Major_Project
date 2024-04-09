export const returnUrl = (propertyTag, propertyId) => {
    if (propertyTag === "hostel") {
        return `http://localhost:8000/api/v1/hostels/find-hostel?id=${propertyId}`;
    } 
    else if (propertyTag === "pg") {
        return `http://localhost:8000/api/v1/pgs/find-pg?id=${propertyId}`;
    }
    else {
        return `http://localhost:8000/api/v1/flats/find-flat?id=${propertyId}`;
    }
}