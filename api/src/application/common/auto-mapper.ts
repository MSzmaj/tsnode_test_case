import { createMapper } from '@automapper/core';
import { classes } from '@automapper/classes';

const autoMapper = createMapper({
    name: 'mapper',
    pluginInitializer: classes
});

export { autoMapper };