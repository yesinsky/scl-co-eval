module.exports = {
    name: 'feature-one',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/libs_fe/feature-one',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};
