module.exports = {
    name: 'feature-two',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/libs_fe/feature-two',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};
