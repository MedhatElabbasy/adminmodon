export interface Package{
    id: string,
    packageName: string,
    packageNameEn: string,
    packageDescription: string,
    packageDescriptionEn: string,
    packageTotalCost: 0,
    packageDetails:PackageDetails[]
}

export interface PackageDetails{
    id: string,
    packageItemsId: string,
    packageItems:PackageItems,
    limit: 0,
    isAvilable: true
}

export interface PackageItems{
    created: string,
    createdBy: string,
    lastModified: string,
    lastModifiedBy: string,
    id: string,
    isSelected:false,
    isDeleted: boolean,
    itemName: string,
    itemNameEn: string,
    value: string,
    keysEnable:string,
    keysDisable: string,
    blockedService: string,
    cost: 0,
    isUndefined: true
    
}
