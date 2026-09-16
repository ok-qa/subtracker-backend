import {
  getFeatureFlags,
  updateFeatureFlags,
  deleteFeatureFlag,
  createFeatureFlag,
} from "../services/featureFlags.js";

export const getFeatureFlagsController = async (req, res) => {
  const featureFlags = await getFeatureFlags();
  res.json({
    status: 200,
    message: "Successfully found all feature flags",
    data: featureFlags,
  });
};

export const patchFeatureFlagsController = async (req, res, next) => {
  const result = await updateFeatureFlags(req.body);
  if (!result) {
    next(createHttpError(404, "FeatureFlags not found"));
    return;
  }

  const status = 200;

  res.status(status).json({
    status,
    message: `Successfully updated feature flags!`,
    data: result,
  });
};

export const createFeatureFlagController = async (req, res, next) => {
  const updatedFlags = await createFeatureFlag(req.body);

  const status = 200;

  res.status(status).json({
    status,
    message: `Successfully created new feature flag!`,
    data: updatedFlags,
  });
};

export const deleteFeatureFlagController = async (req, res, next) => {
  const { featureFlagId } = req.params;
  const featureFlag = await deleteFeatureFlag(featureFlagId);
  if (!featureFlag) {
    throw createHttpError(404, "Feature Flag not found");
  }
  res.status(204).send();
};
