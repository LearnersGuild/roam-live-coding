const CITY_PROPS = [
  'id',
  'name',
  'latitude',
  'longitude',
  'image_url',
  'description',
  'posts',
]

const POST_PROPS = [
  'id',
  'city_id',
  'user_id',
  'title',
  'body',
  'created_at',
]

module.exports = {
  CITY_PROPS,
  POST_PROPS,
}