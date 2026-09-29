/** Root the loader mounts this package at: a spelled-out repository path does not resolve. */
const files = `${__OCT_PACKAGE_ROOT__}/scripts_files`

export const Paths = {
	Files: files,
	Icons: `${files}/truesight-esp/icons`,
	/** Shipped from `scripts_files/fs`, which the loader mounts over the game's own files. */
	TrueSight: "particles/octarine/truesight-esp/ward_true_sight_true_sight.vpcf"
} as const
