import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import axios from 'axios';

export default function LibsTest() {
  return (
    <View>
      <Text>LibsTest.test</Text>
      <Button
        title="submit"
        onPress={() =>
          axios
            .put(
              'https://panther-mania.id/api/v1/update',
              {
                nama_lengkap: 'Testing',
                email: 'testing02@panther.com',
                password: 'rahasia123',
                password_confirmation: 'rahasia123',
                jenis_kelamin: 'Perempuan',
                ukuran_baju: 'L',
                tempat_lahir: 'Bantul',
                tanggal_lahir: '2023-03-09',
                agama: 'Islam',
                status_nikah: 'Janda',
                alamat_lengkap: 'Kretek, Bantul, Yogyakarta',
                kelurahan: 'Tirtohargo',
                kecamatan: 'Gegunung',
                provinsi: 'Daerah Istimewa Yogyakarta',
                kabupaten_kota: 'Bantul',
                handphone: '012345678910',
                no_whatsapp: '085157439660',
                telp_rumah: '012345678910',
                telp_kantor: '012345678910',
                pekerjaan: 'Programmer',
                nama_perusahaan: 'Pondok IT',
                alamat_perusahaan: 'Daerah Istimewa Yogyakarta',
                sekolah: 'Sekolah Umum',
                no_ktp: '12312313123',
                no_sim: '391729387462370',
                type_kendaraan: 'Truk',
                tahun_kendaraan: '2022',
                no_polisi: '234234123123',
                warna_kendaraan: 'Merah Muda',
                no_chasis: '123123123',
                no_engine: '123123123123',
                tanggal_pajak: '2023-03-09',
                kodepos: '55152',
                lat: '123123',
                lng: '123123123',
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization:
                    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcGFudGhlci1tYW5pYS5pZFwvYXBpXC92MVwvYXV0aCIsImlhdCI6MTY4MDUwODI5MSwiZXhwIjoxNjgwNTExODkxLCJuYmYiOjE2ODA1MDgyOTEsImp0aSI6IlNQWEV1dU1mb0dSUHR2aW0iLCJzdWIiOjMxMzcsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJsYXQiOiItNi4xNzU0MjEiLCJsbmciOiIxMDYuODI3MjI3In0.FuhpQOUAJq0PFxvMhc6DiPME-zFG_gLwv8aQhPxcBHk',
                },
              },
            )
            .then(response => console.log(response.data))
            .catch(err => console.log(err.response.data.message))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({});
