module.exports = {
    name: 'feature-three',
    preset: '../../jest.config.js',
    coverageDirectory: '../../coverage/libs_fe/feature-three',
    snapshotSerializers: [
        'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
        'jest-preset-angular/build/AngularSnapshotSerializer.js',
        'jest-preset-angular/build/HTMLCommentSerializer.js',
    ],
};
