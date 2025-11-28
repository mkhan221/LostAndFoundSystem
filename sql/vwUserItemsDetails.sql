CREATE OR REPLACE VIEW vwUserItemsDetails AS
SELECT
    ui.UserItemId,
    ui.DatePosted AS UserItemDatePosted,
    ui.IsFound,
    
    -- Item details
    i.ItemId,
    i.Description AS ItemDescription,
    i.Category AS ItemCategory,
    i.ImagePath AS ItemImagePath,
    i.Status AS ItemStatus,
    i.DatePosted AS ItemDatePosted,
    
    -- Location details
    l.LocationId,
    l.BuildingName AS LocationBuilding,
    l.Description AS LocationDescription,
    
    -- QR code info (optional)
    q.QrCodeId,
    q.QrCodePath,
    q.CreatedOn AS QrCodeCreatedOn,
    
    -- Posted by user info
    u.UserId AS PostedByUserId,
    u.FirstName AS PostedByFirstName,
    u.LastName AS PostedByLastName,
    u.UserType AS PostedByUserType,
    u.Email AS PostedByEmail,
    u.PhoneNumber AS PostedByPhoneNumber

FROM UserItems ui
LEFT JOIN Items i ON ui.ItemId = i.ItemId
LEFT JOIN Locations l ON ui.LocationId = l.LocationId
LEFT JOIN QrCodes q ON l.QrCodeId = q.QrCodeId
LEFT JOIN Users u ON ui.PostedByUserId = u.UserId
ORDER BY ui.DatePosted DESC;
