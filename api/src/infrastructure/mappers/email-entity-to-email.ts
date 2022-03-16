import { CamelCaseNamingConvention, mapFrom, Mapper, MappingProfile } from '@automapper/core';
import { EmailEntity } from '..';
import { Email } from '../../domain';

const EmailEntityToEmailProfile: MappingProfile = (mapper: Mapper) => {
    mapper.createMap(
        EmailEntity, Email, {
            namingConventions: {
                source: new CamelCaseNamingConvention(),
                destination: new CamelCaseNamingConvention(),
            }
        }
    ).forMember((destination) => destination.id, mapFrom((source) => source.id))
    .forMember((destination) => destination.currentProcessed, mapFrom((source) => source.currentProcessed))
    .forMember((destination) => destination.target, mapFrom((source) => source.target))
}

export { EmailEntityToEmailProfile };