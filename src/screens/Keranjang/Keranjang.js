import React, {useEffect, useState, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useSelector} from 'react-redux';
import {BackgroundImage, Header} from '../../components';
import {ImgNotAvailable} from '../../assets';
import {colors} from '../../utils/constant';
import {useOrientation} from '../../hooks';

export default function Keranjang({navigation}) {
  const token = useSelector(state => state.auth.token);
  const {width} = useOrientation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch('https://panther-mania.id/api/v1/riwayat_order', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      const filtered = json?.data?.filter(item => item.status !== 'success');

      setOrders(filtered || []);
    } catch (e) {
      console.error('Riwayat order error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      setLoading(true);
      fetchOrders();
    });
    return unsub;
  }, [navigation]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchOrders();
  }, []);

  const extractSummary = html => {
    if (!html || typeof html !== 'string') return '';

    const clean = html
      .replace(/<font[^>]*>/gi, '')
      .replace(/<\/font>/gi, '')
      .replace(/<[^>]+>/g, '|')
      .replace(/\s+/g, ' ');

    const parts = clean
      .split('|')
      .map(t => t.trim())
      .filter(Boolean);

    return parts.slice(0, 3).join(' • ');
  };

  const renderItem = val => {
    const summary = extractSummary(val?.produk?.deskripsi);

    return (
      <TouchableOpacity
        key={val.id_order}
        activeOpacity={0.9}
        style={styles.card}
        onPress={() =>
          navigation.navigate('KeranjangDetails', {
            id_order: val.id_order,
          })
        }>
        <Image
          source={
            val?.produk?.gambar
              ? {
                  uri: `https://panther-mania.id/images/products/${val.produk.gambar}`,
                }
              : ImgNotAvailable
          }
          resizeMethod="resize"
          resizeMode="contain"
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={1}>
            {val?.produk?.nama_produk}
          </Text>

          {summary ? (
            <Text style={styles.subtitle} numberOfLines={2}>
              {summary}
            </Text>
          ) : null}

          <View style={styles.bottomRow}>
            <Text style={styles.location}>{val?.keterangan || '-'}</Text>

            <Text style={styles.price}>
              Rp {Number(val?.produk?.harga || 0).toLocaleString('id-ID')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <BackgroundImage />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Header title="Riwayat Order" onPress={() => navigation.goBack()} />

        {loading ? (
          <View style={styles.center}>
            <Text style={styles.loading}>Memuat riwayat order...</Text>
          </View>
        ) : orders.length > 0 ? (
          orders.map(renderItem)
        ) : (
          <View style={styles.center}>
            <Text style={styles.empty}>Tidak ada riwayat order</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 18,
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
  subtitle: {
    fontSize: 13,
    color: colors.grey,
    marginTop: 4,
    lineHeight: 18,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  location: {
    fontSize: 12,
    color: colors.grey,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
  center: {
    height: 260,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    fontStyle: 'italic',
    color: colors.grey,
  },
  empty: {
    fontStyle: 'italic',
    color: colors.grey,
  },
});
