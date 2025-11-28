-- GET ALL USER ITEMS (from view)
CREATE OR REPLACE FUNCTION fnGetAllUserItemsDetails()
RETURNS TABLE (
    UserItemId INT,
    UserItemDatePosted TIMESTAMP,
    IsFound BOOLEAN,
    
    -- Item details
    ItemId INT,
    ItemDescription TEXT,
    ItemCategory VARCHAR,
    ItemImagePath VARCHAR,
    ItemStatus VARCHAR,
    ItemDatePosted TIMESTAMP,
    
    -- Location details
    LocationId INT,
    LocationBuilding VARCHAR,
    LocationDescription TEXT,
    
    -- QR Code info
    QrCodeId INT,
    QrCodePath VARCHAR,
    QrCodeCreatedOn TIMESTAMP,
    
    -- Posted by user details
    PostedByUserId INT,
    PostedByFirstName VARCHAR,
    PostedByLastName VARCHAR,
    PostedByUserType VARCHAR,
    PostedByEmail VARCHAR,
    PostedByPhoneNumber VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM vwUserItemsDetails
    ORDER BY UserItemDatePosted DESC;
END;
$$ LANGUAGE plpgsql;


-- READ ONE USER ITEM BY ID (from view)
CREATE OR REPLACE FUNCTION fnReadUserItemDetails(p_UserItemId INT)
RETURNS TABLE (
    UserItemId INT,
    UserItemDatePosted TIMESTAMP,
    IsFound BOOLEAN,
    
    ItemId INT,
    ItemDescription TEXT,
    ItemCategory VARCHAR,
    ItemImagePath VARCHAR,
    ItemStatus VARCHAR,
    ItemDatePosted TIMESTAMP,
    
    LocationId INT,
    LocationBuilding VARCHAR,
    LocationDescription TEXT,
    
    QrCodeId INT,
    QrCodePath VARCHAR,
    QrCodeCreatedOn TIMESTAMP,
    
    PostedByUserId INT,
    PostedByFirstName VARCHAR,
    PostedByLastName VARCHAR,
    PostedByUserType VARCHAR,
    PostedByEmail VARCHAR,
    PostedByPhoneNumber VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT *
    FROM vwUserItemsDetails AS v
    WHERE v.UserItemId = p_UserItemId;
END;
$$ LANGUAGE plpgsql;
